from django.shortcuts import render
from .models import MyModel


def home(request):
    return render(request, 'index.html')


def paintings(request):
    return render(request, 'paintings.html')


def sculptures(request):
    return render(request, 'sculptures.html')


def engravings(request):
    return render(request, 'engravings.html')


def future_auction(request):
    return render(request, 'futureauction.html')


def winners(request):
    return render(request, 'winners.html')


def my_view(request, new_value=None, value1=None, value2=None):
    # Creating a new object
    new_object = MyModel.objects.create(field1=value1, field2=value2)

    # Retrieving existing objects
    objects = MyModel.objects.all()

    # Updating an object
    obj = MyModel.objects.get(id=1)
    obj.field1 = new_value
    obj.save()

    # Deleting an object
    obj = MyModel.objects.get(id=1)
    obj.delete()
