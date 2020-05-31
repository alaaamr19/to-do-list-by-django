import datetime

from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone

from .models import Task


def index(request):
    latest_tasks = Task.objects.filter(pub_date__gte=timezone.now() - datetime.timedelta(days=7))
    context = {'latest_tasks': latest_tasks}
    return render(request, 'tasks/index.html', context)


def add(request):
    data = {"exist": Task.objects.filter(title=request.GET['title']).exists()}
    if data["exist"]:
        data["message"]= "you already add this task"
    else:
        task = Task.objects.create(title=request.GET['title'])
        data["message"]="task added successfully"
    # if request.is_ajax and request.method == "GET":
    return JsonResponse(data)


def change_status(request, task_id):
    try:
        task = Task.objects.get(pk=task_id)
        task.status = request.GET['status']
        task.save()
    except Task.DoesNotExist:
        raise Http404("task does not exist")
    return HttpResponse("You're add task")
    # return render(request, 'task/detail.html', {'task': task})
