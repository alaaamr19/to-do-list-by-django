from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Task


# Function to get todos and render the Home page.
def index(request):
    task_list = Task.objects.all().order_by('-pub_date')
    # Show 10 contacts per page.
    paginator = Paginator(task_list, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'tasks/index.html', {'page_obj': page_obj})


# Function to add tasks to your List.
def add(request):
    task = Task.objects.create(title=request.GET['title'])
    task_id = task.id
    date = task.pub_date
    return JsonResponse({"id": task_id, "date": date})


# Function to change status of task.
def change_status(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
        task.status = request.GET['status']
        task.save()
    except Task.DoesNotExist:
        raise Http404("task does not exist")
    return JsonResponse({"success": "success"})
