from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_401_UNAUTHORIZED,
    HTTP_400_BAD_REQUEST
)
from django.shortcuts import get_object_or_404
from utilities.userPermissions import UserPermissions
from utilities.analysis import calculate_analysis
from utilities.worksheet_status import check_complete_status
from utilities.property_utilities import get_user_and_portfolio
from .serializers import (PropertySerializer, ListSerializer, PurchaseWorksheetSerializer, OperatingExpensesSerializer,
                          Property, List_of_Properties, Purchase_Worksheet, Operating_Expenses, Property_Analysis,
                          PropertyAnalysisSerializer)
from portfolio_app.serializers import PortfolioSerializer

# Create your views here.

class Get_Portfolio(UserPermissions):

    def get(self, request):
        user, portfolio = get_user_and_portfolio(request)

        json_portfolio = PortfolioSerializer(portfolio).data

        return Response(json_portfolio)
    
class Create_Property(UserPermissions):

    def post(self, request):
        new_property = Property(**request.data)
        new_property.full_clean()
        new_property.save()
        new_operating_expenses = Operating_Expenses.objects.create()
        new_purchase_worksheet = Purchase_Worksheet.objects.create(matching_property=new_property, operating_expenses=new_operating_expenses)
        new_purchase_worksheet.full_clean()
        new_purchase_worksheet.save()
        new_operating_expenses.full_clean()
        new_operating_expenses.save()

        json_new_property = PropertySerializer(new_property).data
        return Response(json_new_property, status=HTTP_201_CREATED)

class A_Property(UserPermissions):

    def get(self, request, id):
        a_property = get_object_or_404(Property, id=id)
        json_property = PropertySerializer(a_property).data

        return Response(json_property)

    def delete(self, request, id):
        a_property = get_object_or_404(Property, id=id)
        a_property.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, id):
        a_property = get_object_or_404(Property, id=id)

        json_property = PropertySerializer(a_property, data=request.data, partial=True)
        if json_property.is_valid():
            json_property.save()
            return Response(json_property.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_property.errors, status=HTTP_400_BAD_REQUEST)

class All_Lists(UserPermissions):
  
    def get(self, request):
        all_lists = List_of_Properties.objects.all()
        json_lists = ListSerializer(all_lists, many=True).data

        return Response(json_lists)
    
    def post(self, request):
        new_list = List_of_Properties.objects.create(**request.data)
        new_list.full_clean()
        new_list.save()
        json_new_list = ListSerializer(new_list).data

        return Response(json_new_list, status=HTTP_201_CREATED)

class A_List(UserPermissions):

    def get(self, request, id):
        a_list = List_of_Properties.objects.get(id=id)
        json_list = ListSerializer(a_list).data

        return Response(json_list)
    
    def delete(self, request, id):
        a_list = get_object_or_404(List_of_Properties, id=id)
        a_list.delete()

        return Response(status=HTTP_204_NO_CONTENT)

    def put(self, request, id):
        a_list = get_object_or_404(List_of_Properties, id=id)
        json_list = ListSerializer(a_list, data=request.data, partial=True)

        if json_list.is_valid():
            json_list.save()
            return Response(json_list.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_list.errors, status=HTTP_400_BAD_REQUEST)

class Add_To_List(UserPermissions):
    
    def put(self, request, propid, listid):
        a_property = get_object_or_404(Property, id=propid)
        a_list = get_object_or_404(List_of_Properties, id=listid)

        a_property.list_of_properties.add(a_list)
        a_property.full_clean()
        a_property.save()

        json_property = PropertySerializer(a_property).data

        return Response(json_property)

class Remove_From_List(UserPermissions):

    def put(self, request, propid, listid):
        a_property = get_object_or_404(Property, id=propid)
        a_list = get_object_or_404(List_of_Properties, id=listid)

        a_property.list_of_properties.remove(a_list)
        a_property.full_clean()
        a_property.save()

        json_property = PropertySerializer(a_property).data

        return Response(json_property)

class Add_To_Portfolio(UserPermissions):

    def put(self, request, propid):
        user, portfolio = get_user_and_portfolio(request)
        
        a_property = get_object_or_404(Property, id=propid)
        a_property.portfolio = portfolio

        a_property.full_clean()
        a_property.save()

        json_property = PropertySerializer(a_property).data

        return Response(json_property)

class Remove_From_Portfolio(UserPermissions):

    def put(self, request, propid):   
        a_property = get_object_or_404(Property, id=propid)
        a_property.portfolio = None

        a_property.full_clean()
        a_property.save()

        json_property = PropertySerializer(a_property).data

        return Response(json_property)

class Purchase_Worksheet_View(UserPermissions):

    def get(self, request, propid):
        a_property = get_object_or_404(Property, id=propid)
        purchase_worksheet = Purchase_Worksheet.objects.get(matching_property=a_property)
        json_purchase_worksheet = PurchaseWorksheetSerializer(purchase_worksheet).data
        
        return Response(json_purchase_worksheet)
    

    def put(self, request, propid):
        a_property = get_object_or_404(Property, id=propid)
        purchase_worksheet = Purchase_Worksheet.objects.get(matching_property=a_property)
        json_purchase_worksheet = PurchaseWorksheetSerializer(purchase_worksheet, data=request.data, partial=True)

        is_worksheet_complete = check_complete_status(purchase_worksheet)
        json_purchase_worksheet.completed = is_worksheet_complete  
        
        if json_purchase_worksheet.is_valid() and is_worksheet_complete:
            try:
                purchase_worksheet.property_analysis = calculate_analysis(purchase_worksheet)
            except Exception as e:
                return Response({"error": "Error calculating property analysis."}, status=HTTP_400_BAD_REQUEST)
            
            json_purchase_worksheet.save()
            
            return Response(json_purchase_worksheet.data, status=HTTP_204_NO_CONTENT)
        elif json_purchase_worksheet.is_valid():

            json_purchase_worksheet.save()

            return Response(json_purchase_worksheet.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response(json_purchase_worksheet.errors, status=HTTP_400_BAD_REQUEST)

