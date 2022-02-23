const playWithAFriendButton=document.getElementById("playWithAFriendButton");
const easyButton=document.getElementById("easyButton");
const mediumButton=document.getElementById("mediumButton");
const impossibleButton=document.getElementById("impossibleButton");
const playAgainButton=document.getElementById("playAgainButton");
const barInside0=document.getElementById("barInside0");
const barInside1=document.getElementById("barInside1");
const status=document.getElementById("status");
function computerMove()
{
	if(level==0) return makeRandomMove();
	else if(level==1)
	{
		if(Boolean(Math.round(Math.random()))) return minMax(freeFields, false, true);
		else return makeRandomMove();
	}
	else return minMax(freeFields, false, true);
}
function makeRandomMove()
{
	while(true)
	{
		const fieldX=Math.round(Math.random()*2);
		const fieldY=Math.round(Math.random()*2);
		if(board[fieldY][fieldX]=='') return fieldY*3+fieldX;
	}
}
function minMax(freeFields, turnX, depth0)
{
	if(checkIfSomeoneHasWon())
	{
		if(turnX) return 3;
		else return 1;
	}
	if(freeFields==0) return 2;
	let valueOfThisMove=0;
	let valuesOfMoves=[[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	for(let i=0;i<3;i++)
	{
		for(let j=0;j<3;j++)
		{
			if(board[i][j]=='')
			{
				if(turnX) board[i][j]='x';
				else board[i][j]='o';
				valuesOfMoves[i][j]=minMax(freeFields-1, !turnX, false);
				board[i][j]='';
			}
		}
	}
	if(turnX)
	{
		valueOfThisMove=3;
		for(let i=0;i<3;i++) for(let j=0;j<3;j++) if(valuesOfMoves[i][j]!=0 && valuesOfMoves[i][j]<valueOfThisMove) valueOfThisMove=valuesOfMoves[i][j];		
	}
	else
	{
		let x=0;
		let y=0;
		valueOfThisMove=valuesOfMoves[0][0];
		for(let i=0;i<3;i++)
		{
			for(let j=0;j<3;j++)
			{
				if(valuesOfMoves[i][j]>valueOfThisMove)
				{
					valueOfThisMove=valuesOfMoves[i][j];
					x=j;
					y=i;
				}
			}
		}
		if(depth0) return y*3+x;
	}
	return valueOfThisMove;
}
function makeMove(fieldNr)
{
	let fieldX;
	let fieldY;
	if(fieldNr<3)
	{
		fieldY=0;
		fieldX=fieldNr;
	}
	else if(fieldNr<6)
	{
		fieldY=1;
		fieldX=fieldNr-3;
	}
	else
	{
		fieldY=2;
		fieldX=fieldNr-6;
	}
	if(board[fieldY][fieldX]=='')
	{
		if(turnX)
		{
			document.getElementById("field"+fieldNr).innerHTML='x';
			board[fieldY][fieldX]='x';
			status.innerHTML="Ruch gracza: <span>o</span>";
		}
		else
		{
			document.getElementById("field"+fieldNr).innerHTML='o';
			board[fieldY][fieldX]='o';
			status.innerHTML="Ruch gracza: <span>x</span>";
		}
		document.getElementById("field"+fieldNr).className="inactiveField";
		if(checkIfSomeoneHasWon()) endOfTheGame(false, turnX);
		else
		{
			turnX=!turnX;
			freeFields--;
			if(freeFields==0) endOfTheGame(true, !turnX);
			else if(computerIsAnOpponent && !turnX) makeMove(computerMove());
		}
	}
}
function checkIfSomeoneHasWon()
{
	for(let i=0;i<3;i++) if(board[i][0]!='' && board[i][0]==board[i][1] && board[i][1]==board[i][2]) return true;
	for(let i=0;i<3;i++) if(board[0][i]!='' && board[0][i]==board[1][i] && board[1][i]==board[2][i]) return true;
	if(board[0][0]!='' && board[0][0]==board[1][1] && board[1][1]==board[2][2]) return true;
	if(board[2][0]!='' && board[2][0]==board[1][1] && board[1][1]==board[0][2]) return true;
	return false;
}
function endOfTheGame(draw, xWon)
{
	if(draw) status.innerHTML="Remis!";
	else
	{
		if(computerIsAnOpponent)
		{
			if(xWon) status.innerHTML="Wygrałeś!";
			else status.innerHTML="Przegrałeś!";
		}
		else
		{
			if(xWon) status.innerHTML="<span>x</span> wygrywa!";
			else status.innerHTML="<span>o</span> wygrywa!";
		}
	}
	for(let i=0;i<9;i++) document.getElementById("field"+i).className="inactiveField";
	for(let i=0;i<3;i++) for(let j=0;j<3;j++) board[i][j]='-';
}
function newGame()
{
	board=[['', '', ''], ['', '', ''], ['', '', '']];
	turnX=true;
	freeFields=9;
	for(let i=0;i<9;i++)
	{
		document.getElementById("field"+i).innerHTML="";
		document.getElementById("field"+i).className="activeField";
	}
	status.innerHTML="Ruch gracza: <span>x</span>";
}
let board=[['', '', ''], ['', '', ''], ['', '', '']];
let turnX=true
let freeFields=9;
computerIsAnOpponent=false;
playWithAFriendButton.addEventListener("click", function(){barInside0.style.width="0";barInside1.style.width="24.5vw";computerIsAnOpponent=false;newGame()});
easyButton.addEventListener("click", function(){barInside0.style.width="7.5vw";barInside1.style.width="17vw";computerIsAnOpponent=true;level=0;newGame()});
mediumButton.addEventListener("click", function(){barInside0.style.width="15vw";barInside1.style.width="9.5vw";computerIsAnOpponent=true;level=1;newGame()});
impossibleButton.addEventListener("click", function(){barInside0.style.width="22.5vw";barInside1.style.width="2vw";computerIsAnOpponent=true;level=2;newGame()});
playAgainButton.addEventListener("click", newGame);
field0.addEventListener("click", function(){makeMove(0)});
field1.addEventListener("click", function(){makeMove(1)});
field2.addEventListener("click", function(){makeMove(2)});
field3.addEventListener("click", function(){makeMove(3)});
field4.addEventListener("click", function(){makeMove(4)});
field5.addEventListener("click", function(){makeMove(5)});
field6.addEventListener("click", function(){makeMove(6)});
field7.addEventListener("click", function(){makeMove(7)});
field8.addEventListener("click", function(){makeMove(8)});