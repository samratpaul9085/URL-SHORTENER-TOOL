from django.db import models

# Create your models here.

class Url_model(models.Model):    
    original_url = models.TextField(null=True, blank=True)
    shortened_url = models.TextField(null=True, blank=True)