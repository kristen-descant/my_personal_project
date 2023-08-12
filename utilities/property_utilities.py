from portfolio_app.models import Portfolio

def get_user_and_portfolio(request):
    user = request.user
    portfolio = Portfolio.objects.get(user=user)
    return user, portfolio