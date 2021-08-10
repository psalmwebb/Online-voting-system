const path = require("path");
const Election = require("../models/m.election");
const Candidate = require("../models/m.candidate");
const Voter = require("../models/m.voter");

module.exports = class {

    static get adminCandidate()
    {
        return async (req,res)=>{
            
            const candidates = await Candidate.find({});

            const candidatePosts = Array.from(new Set(candidates.map(candidate=> candidate.post)));

            const elections = await Election.find({});

            res.render("admin/candidate",{active:"candidate",elections,candidates,candidatePosts});
        }
    }

    static get gLogin(){
        return async (_,res)=>{

            res.render("voter/login");
        }
    }

    static get gAdminLogin(){

        return (req,res)=>{

            res.render("admin/login");
        }
    }

    static get adminVoters(){

        return async (req,res)=>{
            const voters = await Voter.find({});

            console.log(voters)

            res.render("admin/voters",{active:"voters",voters});
        }
    }


    static get adminVotes(){

        return (req,res)=>{
            res.render("admin/votes",{active:"votes"});
        }
    }

    static get adminDashboard()
    {
        return async (req,res)=>{

            const elections = await Election.find({});

            const candidates = await Candidate.find({});

            res.render("admin/dashboard",{active:"dashboard",elections,candidates});
        }
    }

    static get adminBallot()
    {

        return async (req,res)=>{

            const elections = await Election.find({});
            res.render("admin/ballot",{active:"ballot",elections,user:req.user});
        }
    }


    static get gDashboard(){

        return async (req,res)=>{

            const elections = await Election.find({});

            res.render("voter/v_dashboard",{elections,user:req.user});
        }
    }

    static get logout(){
        return async function(req,res){
            
            res.cookie("jwt","",{
                maxAge:1,
            })

            res.redirect("/dashboard");
        }
    }
}