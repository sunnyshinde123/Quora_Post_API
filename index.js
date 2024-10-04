const express=require("express");
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

const app=express();
const port=7080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

let posts=[
  {
    id:uuidv4(),
    username:"apnaCollege",
    content:"I am apna college delta batch student"
  },
  {
    id:uuidv4(),
    username:"codingSeekho",
    content:"I am coding seekho batch student"
  },
  {
    id:uuidv4(),
    username:"codingNinja",
    content:"I am coding ninja web development batch student"
  }
]

app.listen(port, ()=>{
  console.log("Port listening to requests");
});

app.get("/", (req, res)=>{
  res.send("Welcome to Quora posts");
})

//Read route
app.get("/posts", (req, res)=>{
  res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res)=>{
  res.render("new.ejs");
})

app.get("/posts/:id", (req, res)=>{
  let {id}=req.params;
  console.log(id);
  let postData=posts.find((data)=> data.id==id);
  console.log(postData);
  res.render("post.ejs", {postData});
})

//Create route
app.post("/posts", (req, res)=>{
  let {username, content}=req.body;
  let newObj={
    id:uuidv4(),
    username,
    content
  }
  console.log(username+" "+content);
  posts.push(newObj);
  res.redirect("/posts");
})


app.get("/posts/edit/:id", (req, res)=>{
  let {id}=req.params;
  console.log(id);
  let postData=posts.find((data)=> data.id==id);
  console.log(postData);
  res.render("edit.ejs", {postData});
})

//Update route
app.patch("/posts/:id", (req, res)=>{
  let {id}=req.params;
  let {content:newContent} = req.body;
  console.log(id);
  let postData=posts.find((data)=> data.id==id);
  postData.content=newContent;
  res.redirect("/posts");
})


//delete routes
app.delete("/posts/:id", (req, res)=>{
  let {id}=req.params;
  console.log(id);
  posts=posts.filter((data)=> data.id!=id);
  console.log(posts);
  res.redirect("/posts");
})

