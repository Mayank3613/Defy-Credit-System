import math

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user_income.models import UserIncome
from user_income.serializers import UserIncomeSerializer


# Create your views here.
class UserIncomeViewSet(viewsets.ModelViewSet):
    serializer_class = UserIncomeSerializer
    queryset = UserIncome.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Add the authenticated user to the data
        data = request.data.copy()
        data['user_id'] = request.user.id

        # Serialize the data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            # Save the data if valid
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # Return errors if invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='your-credit-score')
    def get_your_credit_score(self, request, *args, **kwargs):
        # Get the authenticated user
        user = request.user

        # Get the user's income
        user_income = UserIncome.objects.filter(user_id=user.id)

        # Initialize base score
        base_score = 1000
        total_score = base_score

        # Loop through the user incomes and calculate the credit score
        for income in user_income:
            # Logarithmic scaling for each income type to avoid linear growth
            main_income_score = math.log(income.main_income + 1) * 0.5  # Main Income - Low Risk
            equity_profit_score = math.log(income.equity_profit + 1) * 0.3  # Equity Profit - Moderate Risk
            crypto_profit_score = math.log(income.crypto_profit + 1) * 0.1  # Crypto Profit - High Risk
            rental_income_score = math.log(income.rental_income + 1) * 0.1  # Rental Income - Low to Moderate Risk

            # Add each income's contribution to the total score
            total_score += main_income_score + equity_profit_score + crypto_profit_score + rental_income_score
        print(total_score)
        # Normalize score to ensure it doesn't exceed 1000
        total_score = min(total_score, 1000)

        # Optionally, clamp score to be between 0 and 1000
        total_score = max(total_score, 0)

        # Return the credit score as a response
        return Response({'credit_score': total_score}, status=status.HTTP_200_OK)