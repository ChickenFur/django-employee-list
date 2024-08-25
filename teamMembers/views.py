from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import TeamMember
from .serializer import TeamMemberSerializer

# Create your views here.
@api_view(['GET'])
def getData(request):
  app = TeamMember.objects.all()
  serializer = TeamMemberSerializer(app, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getTeamMemberById(request, id):
  team_member = get_object_or_404(TeamMember, id=id)
  serializer = TeamMemberSerializer(team_member)
  return Response(serializer.data)

@api_view(['POST'])
def postData(request):
  serializer = TeamMemberSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['PUT'])
def putData(request):
  app = TeamMember.objects.get(id=request.data['id'])
  serializer = TeamMemberSerializer(instance=app, data=request.data)
  if serializer.is_valid():
    serializer.save()
  return Response(serializer.data)

@api_view(['DELETE'])
def deleteData(request, id):
  try:
    app = TeamMember.objects.get(id=id)
    app.delete()
    return Response('Item deleted successfully')
  except TeamMember.DoesNotExist:
      return Response('Item not found', status=404)