import axios from "axios";
import { PostType } from "../types/PostType";
import { UserType } from "../types/UserType";

export const getPost = (id:number) =>{
    return axios.get(`http://localhost:5000/posts/${id}`);
}

export const addPost = (post:PostType) =>{
    return axios.post("http://localhost:5000/posts", post);
}

export const putPost = (id:number, post:PostType) =>{
    return axios.put(`http://localhost:5000/posts/${id}`, post);
}

export const deletePost = (id:number)=>{
    return axios.delete(`http://localhost:5000/posts/${id}`);
}

export const getAllPosts = () =>{
    return axios.get("http://localhost:5000/posts");
}

export const findPosts = (searchValue:string) =>{
    return axios.get(`http://localhost:5000/posts?q=${searchValue}`);
}

export const filterPosts = (category:string)=>{
    return axios.get(`http://localhost:5000/posts?category=${category}`);
}

export const getRelatedPosts = (category: string) => {
    return axios.get(`http://localhost:5000/posts?category=${category}&_start=0_end=3`);
}

export const getSomePosts = (start:number, end: number) =>{
    return axios.get(`http://localhost:5000/posts?_start=${start}&_end=${end}`);
}

export const addUser = (user:UserType) =>{
    return axios.post("http://localhost:5000/users", user);
}

export const getAllUsers = () => {
    return axios.get("http://localhost:5000/users");
}