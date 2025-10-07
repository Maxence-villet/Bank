
class transaction:
     
     def __init__(self, sender_id, receiver_id, amount):
         self.sender_id = sender_id
         self.receiver_id = receiver_id
         self.amount = amount

     def execute(self):
         if user[self.sender_id]["balance"] >= self.amount:

             user[self.sender_id]["balance"] -= self.amount
             user[self.receiver_id]["balance"] += self.amount
             return True
         else:
             return False
     def __str__(self):
         return f"Transaction from {user[self.sender_id]['username']} to {user[self.receiver_id]['username']} of amount {self.amount}"
         
t1 = transaction(1, 2, 50)
t2 = transaction(2, 1, 30)

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

    t1.execute()
    t2.execute()
    print(t1)
    print(t2)
    print(user[1]["balance"] )