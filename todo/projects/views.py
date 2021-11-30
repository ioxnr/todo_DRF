from django.shortcuts import render
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from projects.filters import ProjectFilter, ToDoFilter
from projects.models import Project, ToDo
from projects.serializers import ProjectModelSerializer, ToDoModelSerializer


# Create your views here.

# class ProjectModelViewSet(ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectModelSerializer
#     # parser_classes = (CamelCaseJSONParser,)


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


# class ToDoModelViewSet(ModelViewSet):
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoModelSerializer
#     # parser_classes = (CamelCaseJSONParser,)


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = TodoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
