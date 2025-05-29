# TerraSense - Dockerized Deployment Guide

This repository contains Docker-ready configurations for both the **Frontend** and **Backend** of the TerraSense project.

---

## 🐳 Docker Overview

- **Dockerfiles** are already present inside the respective folders.
- You can directly build and run the containers using the provided `Dockerfile` and/or `docker-compose.yml`.

---

## 🔧 Backend Service

- **Port:** `5000`
- **Runs on:** Node.js
- **Docker Image:** `anshulmenaria/terrasense-backend`
- **Exposed to host as:** `http://localhost:5000`

---

## 🌐 Frontend Service

- **Port (inside container):** `80` (served via Nginx)
- **Exposed to host as:** `http://localhost:8080`
- **Docker Image:** `anshulmenaria/terrasense-admin-panel`

---

## ▶️ Deployment

Use `docker-compose.yml` to bring up both services:

```bash
docker-compose up -d


##Authorization

Username: Admin
Password: Admin123
