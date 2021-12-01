from django_filters import rest_framework as filters

from projects.models import Project, ToDo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class ToDoFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = ToDo
        fields = ['id', 'project', 'text', 'created']
