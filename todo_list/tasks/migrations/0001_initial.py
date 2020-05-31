# Generated by Django 3.0.4 on 2020-05-31 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('status', models.BooleanField(default=False)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
        ),
    ]
