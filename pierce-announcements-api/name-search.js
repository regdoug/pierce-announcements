const invitees = [
    {
        id: 1,
        fullName: "Kelvin & Carolyn Pierce and family",
        nameTokens: ["kelvin", "carolyn", "pierce"],
        responseBucket: "abcde"
    },
    {
        id: 2,
        fullName: "Keith & Kathy Pierce",
        nameTokens: ["keith", "kathy", "kathleen", "pierce"],
        responseBucket: "weifer"
    },
    {
        id: 3,
        fullName: "Mary Ann McNamara",
        nameTokens: "mary ann mcnamara",
        responseBucket: "uncleed"
    }
];

var search = "Kelvim pierc";
var searchTokens = search.split(' ');

var inviteeScores = [0, 0, 0];

invitees.forEach(function(invitee, index){
    inviteeScores[index] = searchTokens.reduce(function(inviteeTotalScore, currentSearchToken){
        inviteeTotalScore += invitee.nameTokens.reduce(function(bestScoreForCurrentToken, currentNameToken){
            var currentScore = currentSearchToken.distance(currentNameToken);
            return ( currentScore > bestScoreForCurrentToken ) ? currentScore : bestScoreForCurrentToken;
        }, 0);
    }, 0);
});