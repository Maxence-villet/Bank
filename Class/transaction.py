from datetime import datetime
from uuid import uuid4

class transaction:
     
     def __init__(self, sender_id, receiver_id, amount):
         self.sender_id = sender_id
         self.receiver_id = receiver_id
         self.amount = amount
         self.uuid_transaction = str(uuid4())
         self.executed_at = datetime.now()

     def execute(self):
        if user[self.sender_id]["balance"] < self.amount:
            print(f"Transaction from {user[self.sender_id]['username']} to {user[self.receiver_id]['username']} of amount {self.amount} have been failed")
            return False
        
        user[self.sender_id]["balance"] -= self.amount
        user[self.receiver_id]["balance"] += self.amount
        print(f"Transaction from {user[self.sender_id]['username']} to {user[self.receiver_id]['username']} of amount {self.amount} have been executed successfully")
        return True
        
         
if __name__ == "__main__":
    user:dict =\
  {
     1:{
     "username":"Alice",
     "balance":100
     },
     2:{
     "username":"Bob",
     "balance":100
     }
 }
    
    t1 = transaction(1, 2, 500)
    t2 = transaction(2, 1, 50)

    t1.execute()
    t2.execute()
    

