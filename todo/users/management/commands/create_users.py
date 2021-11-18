from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('Anna', 'anna@gmail.com')
        User.objects.create_user('user1', 'user1@mail.ru')
        User.objects.create_user('user2', 'user2@gmail.com')
        User.objects.create_user('user3', 'user3@mail.ru')
