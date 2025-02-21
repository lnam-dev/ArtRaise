from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)  # Час очікування між запитами (1-3 сек)

    @task(1)
    def get_authors(self):
        self.client.get("/api/authors/", name="Get Authors")

    @task(1)
    def get_events(self):
        self.client.get("/api/events/")

    @task
    def get_artpieces(self):
        self.client.get("/api/artpieces/")
