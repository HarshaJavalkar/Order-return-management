def s_chrs(strs):
    sort_chrs=sorted(strs, reverse=True)
    return "".join(sort_chrs)
def f_chrs(sC):
    fO = ""
    for i in sC:
        if(i in 'aeiouAEIOU'):
            fO=fO+i
    return fO
def printWord(filtWord):
    return {x: sum([1 for char in filtWord if char ==x]) for x in filtWord }
    
strs = input()
filtWord=f_chrs(s_chrs(strs))
if(len(filtWord)==0):
    print("No vowels found.")
else:
    print(printWord(filtWord))





