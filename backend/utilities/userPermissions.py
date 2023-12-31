from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class UserPermissions(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]