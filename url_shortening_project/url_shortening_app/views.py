from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Url_model
import random
import string
from django.http import JsonResponse
import json


@csrf_exempt
def home(request):
    context = {}
    context['url_list'] = get_url_list()
    return render(request, 'home.html', context)


@csrf_exempt
def get_create_url(request):
    context = {}
    if request.method == "POST":
        new_url = request.POST.get('url', '')
        add_url(request, context, new_url)
        return render(request, 'url_list.html', context) 
    if request.method == "GET":
        url_id = request.GET.get('url_id')
        url_obj =  Url_model.objects.get(id=url_id)
        original_url = url_obj.original_url
        return JsonResponse({'original_url':original_url}, status=200)


@csrf_exempt
def update_url(request):
    context = {}
    url_id = request.POST.get('url_id', '')
    new_url = request.POST.get('new_url', '')
    url_obj = Url_model.objects.get(id=url_id)
    url_obj.original_url = new_url
    url_obj.save()
    context['url_list'] = get_url_list()
    return render(request, 'url_list.html', context)


@csrf_exempt
def delete_url(request):
    context = {}
    url_id = request.POST.get('url_id', '')
    url_obj = Url_model.objects.get(id=url_id)
    url_obj.delete()
    context['url_list'] = get_url_list()
    return render(request, 'url_list.html', context)


def add_url(request, context, new_url):
    url_text =  get_url_text(new_url)
    url_exist = Url_model.objects.filter(original_url__contains=url_text).first()
    if url_exist:
        context['generated_url'] = url_exist.shortened_url
        context['original_url'] = url_exist.original_url
        context['url_list'] = get_url_list()
    else:
        shorter_url = randomString(5)
        url_obj = Url_model()
        url_obj.original_url = new_url
        url_obj.shortened_url = shorter_url
        url_obj.save()
        context['generated_url'] = url_obj.shortened_url
        context['original_url'] = url_obj.original_url
        context['url_list'] = get_url_list()


def get_url_list():
    urls = Url_model.objects.all()
    url_list = []
    for item in urls:
        dic = {}
        dic['id'] = item.id
        dic['original_url'] = item.original_url
        dic['shortened_url'] = item.shortened_url
        url_list.append(dic)
    return url_list


def randomString(stringLength=5):
    """Generate a random string of fixed length """
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


def get_url_text(new_url):
    if 'www.' in new_url:
        new_url = new_url.replace('www.' , '', 1)
    if 'https://' in new_url:
        new_url = new_url.replace('https://' , '', 1)
    if 'http://' in new_url:
        new_url = new_url.replace('http://' , '', 1)
    return new_url