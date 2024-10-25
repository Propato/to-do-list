#!/bin/bash

case $1 in
   -b|--build)
        cd backend
        ./scripts.sh -b
        cd ../frontend
        npm i
        npm start
   ;;
   -d|--down)
        cd backend
        ./scripts.sh -d
   ;;
   -r | --remove)
        cd frontend
        rm -rf node_modules
        cd ../backend
        ./scripts.sh -r
   ;;
   -h|--help)
    	echo "
   scripts.sh [ -b | -d | -r | -h ]

    -b   | --build      Inicia aplicação Back e Front end;
    -d   | --down       Encerra a aplicação Backend;
    -r   | --remove     Remove os arquivos criados ao rodar a aplicação;
    -h   | --help       Imprime esta mensagem de ajuda.
   "
      exit
   ;;
   *)
      echo "
   Parâmetro inválido
         
   Veja -h para parâmetros válidos.
   "
      exit 1
   ;;
esac

cd $CDIR