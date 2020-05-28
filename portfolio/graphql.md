query Portfolio {
  portfolio(id:"da789ad1") {
    title
    }
}

mutation CreatePortfolio {
	createPortfolio(input:{
    title: "Work in USA"
    company: "WhoKnows"
    companyWebsite: "www.google.com"
    location: "USA, Montana"
    jobTitle: "Housekeeping"
    description: "So much responsibility....Overloaaaaaad"
    startDate: "01/01/2010"
    endDate: "01/01/2011"
  }){
    _id
    title
    description
  }  
}

mutation UpdatePortfolio {
	updatePortfolio(id: "sadcxv9", input:{
    title: "Updated Work in USA"
    company: "Updated WhoKnows"
    companyWebsite: "updated www.google.com"
    location: "USA, Montana"
    jobTitle: "Housekeeping"
    description: "So much responsibility....Overloaaaaaad"
    startDate: "01/01/2010"
    endDate: "01/01/2011"
  }){
    _id
    title
    description
  }  
}