from django.db import models
from django.utils import timezone

class Task(models.Model):
    class Status(models.IntegerChoices):
        ACTIVE = 1
        DOING = 2
        DONE = 3

    status = models.IntegerField(choices=Status.choices,default=1)
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published',default=timezone.now())

    def __str__(self):
        return self.title
