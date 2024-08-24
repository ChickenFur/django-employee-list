from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import TeamMember
from .serializer import TeamMemberSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
@api_view(['GET'])
def getData(request):
  app = TeamMember.objects.all()
  serializer = TeamMemberSerializer(app, many=True)
  return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def postData(request):
  serializer = TeamMemberSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@csrf_exempt
@api_view(['PUT'])
def putData(request):
  app = TeamMember.objects.get(id=request.data['id'])
  serializer = TeamMemberSerializer(instance=app, data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)