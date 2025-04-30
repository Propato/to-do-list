#!/bin/bash

echo "Stopping and removing all..."
sudo docker compose -f docker-compose.dev.yml down -v --rmi all --remove-orphans

echo "Cleaning up unused volumes..."
sudo docker volume prune -f

echo "Cleaning up unused networks..."
sudo docker network prune -f

echo "Cleaning up every thing else..."
sudo docker system prune -f
