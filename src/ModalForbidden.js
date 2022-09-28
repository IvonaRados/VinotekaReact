import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Link } from "@reach/router";

const ModalForbidden = styled.div`
  max-width: 1000px;
  background-color: white;
  position: fixed;
  top: 100px;
  z-index: 5;
  max-height: 500px;
  left: calc(50% - 50px);
  display: flex;
  flex-direction: column;
`;
export const ModalContent = styled.div`
  overflow: auto;
  min-height: 200px;
  padding: 0px 40px;
  padding-bottom: 80px;
`;
export const ModalFooter = styled.div`
  box-shadow: 0px -2px 20px 0px grey;
  height: 90px;
  display: flex;
  justify-content: center;
`;
export const ConfirmButton = styled.div`
  margin: 10px;
  color: white;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: black;
`;
export const CloseButton = styled.div`
  margin: 10px;
  color: white;
  height: 40px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  width: 200px;
  cursor: pointer;
  background-color: black;
`;
const ModalShadow = styled.div`
  position: fixed;
  height: 200%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;
const ModalBanner = styled.div`
  margin-bottom: 20px;
  background-color: black;
  color: white;
  padding: 10px;
`;


const  ModalExample = (props) => {


  if (!props.open) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={props.handleClose} />
      <ModalForbidden>
        <ModalBanner>Alert!</ModalBanner>
        <ModalContent>
          <h3>Proizvodac {props.obj.ime} se nalazi u listi vina i zbog toga ga je nemoguce izbrisati!!!</h3>
        </ModalContent>
        <ModalFooter>             
            <CloseButton onClick={props.handleClose}> Close </CloseButton>
        </ModalFooter>
      </ModalForbidden>
    </>,
    document.getElementById('app-modal'),
  );
}

export default ModalExample;
