# Generated by Django 2.2.3 on 2019-07-28 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Url_model',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_url', models.TextField(blank=True, null=True)),
                ('shortened_url', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
