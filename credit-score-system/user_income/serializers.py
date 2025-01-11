from rest_framework import serializers

from user_income.models import UserIncome


class UserIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserIncome
        fields = '__all__'
