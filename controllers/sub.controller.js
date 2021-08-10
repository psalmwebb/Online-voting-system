const Election = require("../models/m.election");
const Candidate = require("../models/m.candidate");
const Voter = require("../models/m.voter");
const Admin = require("../models/m.admin");


module.exports = class {

    static get createElection(){
        return async (req,res)=>{

            const {position,numOfCandidate} = req.body;

            const election = await Election.create({position,numOfCandidate});

            if(election){
                return res.status(200).json(election);
            }
            
            res.send({message:"Could not create an election"});
        }
    }


    static get createCandidate(){
        return async (req,res)=>{
            const {firstName,lastName,post} = req.body;

            const candidate = await Candidate.create({firstName,lastName,post})

            if(!candidate) return res.json({message:"Could not create this candidate"})

            const election = await Election.findOne({position:post})

            if(election){
                election.candidatesName.push(`${firstName} ${lastName}`);

                election.save().then((obj)=>{
                    res.status(200).json(obj);
                })
    
            }else{
                res.send({message:"Could not create this candidate"});
            }
        }
    }


    static get createVoter(){
      
        return async function(req,res){
           
            let {name,email,voterId,password} = req.body;

            const voter = await Voter.create({name,email,voterId,password});

            res.status(200).json(voter)
        }
    }

    static get createAdminVotes(){

        return async function(req,res){

            const {electionNames,candidatesChosen} = req.body;
            
            candidatesChosen.forEach(async (candidateChosen)=>{
               let [firstName,lastName] = candidateChosen.split(" ");

               const candidate = await Candidate.findOne({firstName,lastName})

               if(candidate){
                   candidate.numOfVotes += 1
                   await candidate.save()
               }

            })

            electionNames.forEach(async (electionName)=>{
                
                const election = await Election.findOne({position:electionName});

                if(election){
                    election.votersName.push(req.user.username);

                    await election.save();
                }
            })

           const admin = await Admin.findOne({username:req.user.username});

           if(admin){
               admin.voted = true;

               await admin.save();

               res.send({message:"Successfully voted"});
           }
        }
    }

    static get createVotes()
    {

        return async function(req,res){

            const {electionNames,candidatesChosen} = req.body;
            
            candidatesChosen.forEach(async (candidateChosen)=>{
               let [firstName,lastName] = candidateChosen.split(" ");

               const candidate = await Candidate.findOne({firstName,lastName})

               if(candidate){
                   candidate.numOfVotes += 1
                   await candidate.save()
               }

            })

            electionNames.forEach(async (electionName)=>{
                
                const election = await Election.findOne({position:electionName});

                if(election){
                    election.votersName.push(req.user.name);

                    await election.save();
                }
            })

           const voter = await Voter.findOne({name:req.user.name});

           if(voter){
               voter.voted = true;

               await voter.save();

               res.send({message:"Successfully voted"});
           }
        }
    }
}