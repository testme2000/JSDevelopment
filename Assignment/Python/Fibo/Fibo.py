num = int(input())

def fibonacci(n):
    if n < 0:
        return
    count = 3
    prev = 0
    nextv = 1
    print(prev)
    print(nextv)
    while True:
        result = prev + nextv
        print(result)
        prev = nextv
        nextv = result
        count += 1
        if count > n:
            break

def fibonacirecur(prev,nextv,count):
    if count < 0:
        return
    result = prev + nextv
    print(result,end=" ")
    prev = nextv
    nextv = result
    count -= 1
    fibonacirecur(prev,nextv,count)


#fibonacci(num)
print(0,end=" ")
print(1,end=" ")
fibonacirecur(0,1,num - 2)