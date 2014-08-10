/*
*  auther : 404Nan
*  date   : 2014.6.8
*
*/

var _gomoku = function () {


	this.gridnum = 24 ; //单边横排格子数  
	this.isWhite = true; // 设定白棋先手，判断是否该白棋走
    this.isWell = false; // 判断是否赢了
	this.white_piece = 'white_piece';
	this.black_piece = 'black_piece';

	this.init();
}

_gomoku.prototype = {

	init:function(){
		var _this = this;
		this.createBoard();
		this.events();
	},
	createBoard:function(){/*创建棋盘*/

		var _this = this , doc = document , _dombox = "" , _wrapbox , gird_wrapper;

		var frag = doc.createDocumentFragment();

		for (var i = 1; i < 576 ; i++) {

			 _dombox += '<div class="gridItem"><span class="piece"></span></div>';
		};

		gird_wrapper = '<div id="gird_wrapper"><div id="grid_box">'+ _dombox +'</div></div>';
			
		_wrapbox = doc.createElement('div');
		_wrapbox.setAttribute('class','wrapper');
		_wrapbox.innerHTML =  gird_wrapper ;
		frag.appendChild( _wrapbox );

		doc.body.appendChild( frag );
	},
	events:function(){/*事件*/
		var _this = this  ;
		var  _targets = document.getElementById('grid_box').getElementsByTagName('span');

		for (var i = 0 , l = _targets.length ; i < l; i++) {

			_targets[i].onclick =  _this.triggers.click_trigger.call(_this, i , _targets  );
		
		};
	},
	triggers:{/*触发*/
		click_trigger:function( index , elem  ){
			var _this = this;
			
			return function(){
				var _class = elem[index].getAttribute('class') , setPiece , setflag;
				var _clasArr = _class.split(' ');
				if ( _this.isWell == true) {
	               	alert("已经结束了，如果需要重新玩，请刷新");
	                return;
	            }

				if( _this.isWhite ){  

					if( elem[index][0] == -1 ){ 
						return ;
					}
					_this.isWhite = false ;

					setPiece = _this.white_piece;	

					elem[index][0] = -1 ; 
					setflag = -1;

				}else{
					if( elem[index][0] == 1 ){
						return ;
					}
					_this.isWhite = true ;

					setPiece = _this.black_piece;

					elem[index][0] = 1 ; 

					setflag = 1;
				}

				var set_class = setPiece  , another =  setPiece ==  _this.white_piece ?  _this.black_piece :  _this.white_piece ;

				/*set_class = _class == null ? setPiece : _class+' '+ setPiece*/

				for (var x = 0 , _clasArrL = _clasArr.length ; x < _clasArrL ; x++) { //检查是否已设置
				
					if( _clasArr[x] == setPiece ||  _clasArr[x] == another){
						return true;
					}else{

						set_class += ' '+_clasArr[x];
						elem[index].setAttribute('class', set_class );/*添加class以显示棋子*/

					}
				};

				_this.isWin( setflag , index , elem )
			}
			
		}
	},
	isWin:function( piece , index , elem  ){//piece 白棋为0,黑棋为1，

		 var 

             _this = this

            ;

            for(var x = 0 ; x < 4 ; x++ ){
     		
            	if( _this.countIsWin(  piece  , elem , index  , x ) ){
            		if (piece == -1) {
	                    alert("白棋赢了");
	                }
	                else {
	                    alert("黑棋赢了");
	                }
	                _this.isWell = true; //设置该局棋盘已经赢了，不可以再走了
            		break ;
	            }
            }

        

	},
	countIsWin:function(  piece  , elem , index  , _dir ){

	/*
	 *   _dir : 0  = 横向计算 ;1  =  纵向计算 ; 2  = 左斜向计算 ; 3 = 右斜向计算 ;
	 *
	*/
		var _count = 0,
			//_isGridNum = true, 

			gridnum = this.gridnum 

		; 
		switch( _dir ){
			case 0:
			gridnum = 1;
			break;
			case 1:
			gridnum = this.gridnum+1;
			break;
			case 2:
			gridnum = this.gridnum+2;
			break;
			case 3:
			gridnum = this.gridnum;
			break;

		}

		for (var i = 0; i < 5; i++) {
             
         	
         	/*  4列,  整列共9个子 ， 
         	 *	依次判断正行顺序5个子是否一样
         	*/
         	_count = 0;//9个子里每5个子第一个顺序开始初始化总数

        	for( var j = index-i*gridnum ; j <= index+(4-i)*gridnum ;  j = j+gridnum ){


        	
        		 if ( typeof elem[j] == 'undefined' || elem[j][0] !== piece ) {
        		
        		
	            	_count = 0;
           		 }else{

           		 	 _count += piece ;
        		 	
        		 	if( _count >= 5 || _count <= -5) {
	            		return true;
	            	}
           		 }
        	}
        }

         return false;

	}

};