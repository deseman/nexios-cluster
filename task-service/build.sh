set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=mvermeulen
# image name
IMAGE=task-service
docker build -t $USERNAME/$IMAGE:latest .