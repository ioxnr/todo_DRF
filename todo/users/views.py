from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer


# Create your views here.


# class UserModelViewSet(ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserModelSerializer

class UserModelCustomViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin,
                             viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
