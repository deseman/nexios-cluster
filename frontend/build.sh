set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=mvermeulen
# image name
IMAGE=frontend
docker build -t $USERNAME/$IMAGE:latest .