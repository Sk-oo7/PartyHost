import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import DisplayList from './DisplayList'

import './styles.css'

const HamburgerMenu = (props) => {
    const [hamburgerMenuClass, setHamburgerMenuClass] = useState(props.hamburgerMenu)
    const [userexists, setUserexists] = useState(false);
    const [addExpense, setAddExpense] = useState(false);
    const [divideEqualy, setDivideEqualy] = useState(true);
    const [divideBy, setDivideBy] = useState("Amount");
    const [search, setSearch] = useState("");
    const [friendsName,setFriendsName]=useState([]);
    const [Amounts,setAmounts]=useState([]);
    const [Percents,setPercents]=useState([]);
    const [people,setPeople]=useState([]);
    const [respFriends,setRespFriends]=useState([]);
    const [totalAmount,setTotalAmount]=useState(0);
    const [ownAmount,SetOwnAmount]=useState(0);
    const [error,setError]=useState("");
    const [errAlert,setErroralert]=useState(false);
    const [success,setSuccess]=useState("");
    const [successAlert,setSuccessalert]=useState(false);
    const [addExpDisabled,setAddExpDisabled]=useState(false);

    const data = {
        id:JSON.parse(localStorage.getItem("user"))?.id
    }

    useEffect(() => {
        if (localStorage.getItem("user")) {
          setUserexists(true);
        }
      }, []);

      useEffect(() => {
        Axios.post("http://localhost:8080/api/user/friendList",
        data,{
            headers:{
                "Content-Type":"application/json",
            }
        })
        .then(res=>res.data)
        .then(value=>setFriendsName(value))
    }, [])

    const closeHandler = (event) => {
        event.preventDefault()
        setHamburgerMenuClass("hamburger_menu close")
        setTimeout(() => {
            props.close()
        },250)
    }
    const setArray = (person)=>{
        let flag = 0
        people.map(i=>{
            if(i.id === person.id){
                flag=1
                setPeople(people.filter((item)=>item.id !== person.id))
            }
        })
        if(flag === 0)
        setPeople(people=>[...people,person])
        if(flag === 1){
            Amounts.map(i=>{
                if(i.id === person.id){
                    setAmounts(Amounts.filter((item)=>item.id !== person.id))
                }
            })

            Percents.map(i=>{
                if(i.id === person.id){
                    setPercents(Percents.filter((item)=>item.id !== person.id))
                }
            })
        }
    }

    const addAmounts =(val,id) =>{
        
        Amounts.map(i=>{
            if(i.id === id){
                setAmounts(Amounts.filter((item)=>item.id !== id))
            }
        })
        if(val !== "")
        setAmounts(Amounts=>[...Amounts,{id:id,amount:val}])
    }

    const addPercents =(val,id) =>{
       
        Percents.map(i=>{
            if(i.id === id){
                setPercents(Percents.filter((item)=>item.id !== id))
            }
        })
        if(val !== "")
        setPercents(per=>[...per,{id:id,percent:val}])
    }

    function setpercent (id){
        let val = 0
        Percents.map(i=>{
            if(i.id === id){
                val = totalAmount*i.percent/100
            }
        })
        return val
    }
    function setamount (id){
        let val = 0
        Amounts.map(i=>{
            if(i.id === id){
                val = i.amount
            }
        })
        return val
    }

    const submitExpense=()=>{

        if(isNaN(totalAmount) || totalAmount === "" || totalAmount <= 0){
            return (setError("Total Amount is not valid"),setErroralert(true))
        }
        if(people.length === 0){
            return (setError("Please select friends"),setErroralert(true))
        }
        if(divideEqualy){

            const data={
                id:JSON.parse(localStorage.getItem("user"))?.id,
                amount:totalAmount,
                splitEqually:"true",
                friends:JSON.stringify(people.map(friend=>{
                    return friend.id
                }))
            }
            Axios.post("http://localhost:8080/api/party/createParty",
            data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .catch(err=>{return console.log(err)})
            .then(res=>console.log(res),
            setSuccess("Successfully Added Expense"),
            setSuccessalert(true),
            setAddExpDisabled(true)
            )
            setTimeout(() => {
                window.location.reload(false)
            }, 1500);
        }
        if(!divideEqualy && divideBy === "Amount"){
            if(people.length !== Amounts.length || ownAmount == ""){
                return (setError("Please enter all the fields"),setErroralert(true))
            }
            let sum=parseFloat(ownAmount)
            Amounts.map(amt=>
                sum+=parseFloat(amt.amount))
            if(sum != totalAmount){
                return (setError("The payment values do not add up to the total cost of Rs."+totalAmount),setErroralert(true))
            }
            const data={
                id:JSON.parse(localStorage.getItem("user"))?.id,
                amount:totalAmount,
                splitEqually:"false",
                friends:JSON.stringify(Amounts.map(friend=>{
                    return friend.id
                })),
                divideBy,
                friendsAmount:JSON.stringify(Amounts.map(friend=>{
                    return parseFloat(friend.amount)
                }))
            }
            Axios.post("http://localhost:8080/api/party/createParty",
            data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .catch(err=>{return console.log(err)})
            .then(res=>console.log(res),
            setSuccess("Successfully Added Expense"),
            setSuccessalert(true),
            setAddExpDisabled(true)
            )
            setTimeout(() => {
                window.location.reload(false)
            }, 1500);

        }
        if(!divideEqualy && divideBy === "Percentage"){
            if(people.length !== Percents.length || ownAmount == 0 || ownAmount === null){
                return (setError("Please enter all the fields"),setErroralert(true))
            }
            let sum=parseFloat(ownAmount)
            Percents.map(amt=>
                sum+=parseFloat(amt.percent))
            if(sum != 100){
                return (setError("The payment percentage do not add up to the total 100%"),setErroralert(true))
            }
            const data={
                id:JSON.parse(localStorage.getItem("user"))?.id,
                amount:totalAmount,
                splitEqually:"false",
                friends:JSON.stringify(Percents.map(friend=>{
                    return friend.id
                })),
                divideBy:"percent",
                friendsAmount:JSON.stringify(Percents.map(friend=>{
                    return parseFloat(friend.percent)
                }))
            }
            Axios.post("http://localhost:8080/api/party/createParty",
            data,{
                headers:{
                    "Content-Type":"application/json",
                }
            })
            .catch(err=>{return console.log(err)})
            .then(res=>console.log(res),
            setSuccess("Successfully Added Expense"),
            setSuccessalert(true),
            setAddExpDisabled(true)
            )
            setTimeout(() => {
                window.location.reload(false)
            }, 1500);

        }
         
    }
    return (
        <div className={hamburgerMenuClass}>
            <div className="header">
                <img src="close_icon.png" className="close_icon" onClick={closeHandler}/>
                {userexists && <h1 style={{position:"absolute",left: "200px",top: "75px"}}>F.R.I.E.N.D.S</h1>}
                {!userexists && <div><img src="friends_icon.png" style={{height: "500px" , width: "500px"}} /><p style={{fontSize:"20px",textAlign:"center"}}>Please SignIn/Up to see information</p></div>}
            </div>
            <DisplayList />
            <br /><br />
            {userexists && friendsName.length > 0 && <button className="add_expense" onClick={()=>setAddExpense(true)}><span style={{position:"relative",fontSize:"30px",top:"-13px"}}>＋</span><span style={{position:"relative",top:"-15px"}}>Add an expense</span></button>}
            {addExpense &&<div style={{position:"absolute",left:"0px",zIndex:"99",height:"100vh",width:"100vw",backgroundColor:"rgb(0,0,0,0.5)"}}> <div className="add_exp" style={{position:"absolute",zIndex:"100",padding:"20px",display:"flex",flexDirection:"row",justifyContent:'space-between'}}>
                <img src="close_icon.png" style={{cursor: "pointer",height: "30px",width: "30px",position:"absolute",right:"20px",top:"15px"}} onClick={()=>{setAddExpense(false),setAmounts([]),setPercents([]),setPeople([]),setDivideEqualy(true),setDivideBy("Amount"),setTotalAmount(0)}} />
                    <div style={{display:"flex",flexDirection:"column",height:"100%",width:"33%"}}>
                      <div><h1 style={{color:"gray",marginLeft:"10px",marginTop:"10px"}}>Expense Entry</h1></div>
                      <div style={{border:"2px solid lightgray",height:"80%",marginTop:"30px",borderRadius:"5px"}}> 
                      <center style={{marginTop:"10px"}}> Select F.R.I.E.N.D.S</center>
                      <center><input type="text" style={{width:"85%",paddingLeft:"3%",backgroundColor:"lightgray",border:"0px",height:"20px",borderRadius:"8px",marginTop:"20px", padding:"5px",outline: "none",paddingLeft:"12px"}} placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}></input></center>
                    <div style={{ height:"240px",margin:"15px",lineHeight:"40px",overflowY: friendsName.length-1 < 5 ? 'hidden' : 'scroll'}}>

                        {friendsName.map((friend,index)=>
                        (friend.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 || document.getElementById(index)?.style.display === "none") && <div style={{borderBottom:"1px solid gray",display:'flex',flexDirection:"row",margin:"5px 0"}} key={index}>
                                <input type="checkbox" hidden={true}></input>
                            <p id={index} className="friends_icon2"><i>
                                {friend.firstName.toUpperCase().charAt(0)}
                                </i></p>
                            <p id={index+"index"} className="friends_icon2" style={{color:"white",backgroundColor:"#e94646",display:"none"}}><i>
                                ✓
                                </i></p>
                            <label style={{cursor:"pointer"}} onClick={()=>{setArray({id:friend.id,name:friend.firstName+" "+friend.lastName}), document.getElementById(index).style.display !== "none" ?document.getElementById(index).style.display = "none": document.getElementById(index).style.display = "flex", document.getElementById(index+"index").style.display !== "flex"? document.getElementById(index+"index").style.display = "flex":document.getElementById(index+"index").style.display = "none"}} htmlFor={index}>{friend.firstName} {friend.lastName}</label>                            
                            </div>
                        )}

                     </div>
                     </div>
                       </div>
                    <div style={{display:"flex",flexDirection:"column",height:"100%",width:"65%",marginTop:"33px"}}>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                        <input type="tel" maxLength="9" onChange={(e)=>setTotalAmount(e.target.value)} placeholder="Total Amount" style={{border:"0px",borderBottom:"1px solid black",marginLeft:"-35px",width:"130px",marginTop:"-6px",height:"25px"}}></input>
                        <span ><input style={{cursor: "pointer"}} type="checkbox" id="aa" checked={divideEqualy} onChange={()=>setDivideEqualy(!divideEqualy)}></input><label style={{cursor: "pointer"}} htmlFor="aa"> Divide Equally</label></span>
                        
                        {divideEqualy && <select style={{borderRadius:"5px",outline:"none",width:"150px",padding:"5px",marginTop:"-5px"}} defaultValue="a" disabled={divideEqualy}>
                            <option value="a" disabled hidden>Divide By</option>
                        </select>}
                        {!divideEqualy && <select style={{cursor: "pointer",borderRadius:"5px",outline:"none",width:"150px",padding:"5px",marginTop:"-5px"}}defaultValue="Amount" disabled={divideEqualy || (Amounts.length > 0 || Percents.length >0 )} onChange={(e)=>{setDivideBy(e.target.value)}}>
                            <option value="a" disabled hidden>Divide By</option>
                            <option value="Amount">Amount</option>
                            <option value="Percentage">Percentage</option>
                        </select>}
                        </div>
                        <div style={{border:"2px solid lightgray",marginTop:"22px",height:"67%",borderRadius:"5px",overflowY: people.length-1 < 3 ? 'hidden' : 'scroll'}}>
                        <div style={{margin:"5px",lineHeight:"40px",padding:"10px"}}>


                        <div style={{position:"relative",borderBottom:"1px solid gray"}}>
                            
                            <span >
                                 <span className="friends_icon2" style={{position:"absolute",top:"5px",left:"2px"}}><i>
                                     {JSON.parse(localStorage.getItem("user")).firstName.toUpperCase().charAt(0)}
                                </i>
                                </span>
                                <span style={{position:"absolute",top:"5px",left:"46px"}}>{JSON.parse(localStorage.getItem("user")).firstName+" (You)"} </span>
                            </span>

                        {!divideEqualy && <input type="tel" maxLength="9" placeholder={divideBy} onChange={(e)=>SetOwnAmount(e.target.value)} style={{border:"0px",paddingLeft:"5px",borderBottom:"1px solid black",height:"20px",width:"100px",position:"absolute",top:"12px",left:"20vw"}} maxLength="9" />}
                        <span style={{position:"absolute",right:"1vw"}}>
                            Rs. {divideEqualy && parseFloat(totalAmount/(people.length+1)).toFixed(2)}
                            {!divideEqualy && divideBy === "Percentage" && (parseFloat(totalAmount*ownAmount/100).toFixed(2) === "NaN" ? parseFloat(0).toFixed(2) : parseFloat(totalAmount*ownAmount/100).toFixed(2))}
                            {!divideEqualy && divideBy === "Amount" && (parseFloat(ownAmount).toFixed(2) === "NaN" ? parseFloat(0).toFixed(2) : parseFloat(ownAmount).toFixed(2))}
                        </span>
                        <span style={{fontSize:"1px"}}>.</span>
                        </div>
                        </div>
                        {people.map(person=>
                        <div key ={person.id} style={{margin:"5px",lineHeight:"40px",padding:"10px"}}>

                        <div style={{position:"relative",borderBottom:"1px solid gray"}}>
                           <span style={{display:"flex",flexDirection:"row"}}><span className="friends_icon2" >
                                <i>{person.name.toUpperCase().charAt(0)}</i>
                            </span>
                                <span style={{ marginLeft:"-16px",width:"10vw"}}>{person.name}</span></span> 
                             
                        {!divideEqualy && <input type="tel" maxLength="9" placeholder={divideBy} onChange={(e)=>divideBy === "Amount" ? addAmounts(e.target.value,person.id) : addPercents(e.target.value,person.id) } style={{paddingLeft:"5px",height:"20px"}} style={{position:"absolute",top:"10px",left:"20vw",border:"0px",borderBottom:"1px solid black",width:"105px"}}></input>}
                        <span style={{position:"absolute",top:"0px",right:"1vw"}}>
                            Rs. {divideEqualy && parseFloat(totalAmount/(people.length+1)).toFixed(2)}
                            {!divideEqualy && divideBy === "Percentage" && parseFloat(setpercent(person.id)).toFixed(2)}
                            {!divideEqualy && divideBy === "Amount" && parseFloat(setamount(person.id)).toFixed(2)}
                        </span>
                        </div>


                        </div>)}
                        </div>
                        <button disabled={addExpDisabled} style={{outline:"none",cursor:"pointer",backgroundColor:"#e75a5a",color:"white",border:"0",borderRadius:"5px",height:"43px",marginTop:"10px",fontSize:"15px"}} onClick={()=>submitExpense()} >Submit Expense</button>
                         </div>
            </div>
            </div>}
            <Snackbar open={successAlert} autoHideDuration={2000} onClose={()=>setSuccessalert(false)} >
                <Alert severity="success" onClose={()=>setSuccessalert(false)}>
                    {success}
                </Alert>
            </Snackbar>
            <Snackbar open={errAlert} autoHideDuration={4000} onClose={()=>setErroralert(false)}>
                <Alert severity="error" onClose={()=>setErroralert(false)} >
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default HamburgerMenu