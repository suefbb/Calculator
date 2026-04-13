//#rr50=&&()yR
#include <iostream>
#include<cmath>
using namespace std;
//the real sin is the sin that its نطاق from 1 to -1
int getCol(float sin,int rX){
    return round(sqrt(1-pow(sin/10.f,2))*rX);
    //colmn equal cos{sqrt of 1-sin*sin} *r of X axis
}
int main(){
    int rX, rY;
    cout<<"enter rX and rY please\n";
    cin>> rX>> rY;
    char c[2]={' ','a'};//index1 is the shape,index0 is spaces
    for(int sin=rY*10; sin >= -rY*10;){
    //the values of sin from 1 to -1 but to make rows with count ry*2 and each row contain 10ints you should multiply *rY*10
        if (sin >0){sin-=9;/*to make the positive sin from 50 40 to 41 31 to ready to rising loop in recursion*/}
        int col =-rX;bool come=0,come2=0;/*in the begining of row:colmn is the least value of its values,come&come2 check if you come to the rising&descending loop to make loops target 10nums with %10*/
        while (abs(sin)%10!=1||!come){
            for (;col< -getCol(float(sin)/rY,rX);){//i divided sin/rY to make it real sin but *10
                cout<<c[0];col++;/*this is before the colmn:log spaces*/
            }if (col==-getCol(float(sin)/rY,rX)){
                cout<<c[1];col++;}/*this is the col:log shape char*/
            sin+=2*int(sin>0)-1;come=1;//if pos»1,neg»-1 becuase in the loop sin rises far from 0
        }sin-=2*int(sin>0)-1;come=sin<0;/*the rising loop ends with 51 41 and sin must -- to be ready to descending loop*/
        //the second func of come var is:if you descend from positive to 0»it 'll be false,if you descend from negative to 0»it 'll be true
        while (abs(sin)%10!=0||!come2){//to get 50 40 and 41 31 and nums between them
            for (;col< getCol(float(sin)/rY,rX);){//in the rising loop you print negative colmns, but in the descending you print positive
                cout<<c[0];col++;/*this is before the colmn:log spaces*/
            }if (col==getCol(float(sin)/rY,rX)){
                cout<<c[1];col++;}/*this is the col:log shape char*/
            sin-=2*int(sin>0)-1;come2=1;//if pos»1,neg»-1 becuase in the loop sin descends near from 0
        }
        /*the descending loop ends with 40 30 -20....*/
        if (sin<=0&&come){sin-=11;}//if sin is negative{-10 -20,the 0 that come from negative}:minus it 11 to make it -21 -31 -11 to be ready to rising loop in the next لفة
        /*if sin<=0&&came from negative*/
        if (sin==0&&!come){//sin came from positive:make 0 row
            cout<<"\n";col=0;//it likes colmn =-rX and loop to rX but it is easier
            for (;col <=2*rX;col++){
                if (col ==0||col==rX||col==2*rX){cout<<c[1];}//log shape char in first colmn and last colmn and center colmn
                else{cout<<c[0];}
            }
            sin--;//to make sin -1 and ready to rising loop next لفة
        }
        cout<<"\n";//the row ends with \n
    }
    return 0;
}