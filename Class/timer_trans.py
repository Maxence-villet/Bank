import asyncio
import time
import threading

class Timer:
    def __init__(self, seconds: int):
        self.timer = None
        self.start_trans = False
        self.seconds = seconds

    def start_transaction(self):
        self.timer = threading.Timer(self.seconds)
        self.timer.start()
        
    def stop_transaction(self):
        self.timer.cancel()

    def execute():
        print("success")

def main():
    t = Timer(seconds=5)
    t.start_transaction()

'''if __name__ == "__main__":
    main()'''




    



