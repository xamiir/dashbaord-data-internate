import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { Link } from "react-router-dom";

interface AuthorizedButtonProps extends ButtonProps {
  to?: string;
}

const withAuthorization = (WrappedComponent: React.ComponentType<any>) => {
  return ({ ...props }: AuthorizedButtonProps) => {
    if (props.to) {
      return (
        <Link to={props.to}>
          <WrappedComponent {...props} />
        </Link>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

const ButtonWithAuthorization = withAuthorization(Button);

const createAuthorizedButton = () => {
  return ({ children, ...props }: AuthorizedButtonProps) => (
    <ButtonWithAuthorization {...props}>{children}</ButtonWithAuthorization>
  );
};

interface CanProps {
  children?: React.ReactNode | null;
}

export const CanCreate = ({ children }: CanProps) => {
  return children;
};

export const CanView = ({ children }: CanProps) => {
  return children;
};

export const CanDelete = ({ children }: CanProps) => {
  return children;
};

export const CanEdit = ({ children }: CanProps) => {
  return children;
};

export const CanApprove = ({ children }: CanProps) => {
  return children;
};

export const CanReject = ({ children }: CanProps) => {
  return children;
};

const CreateButton = createAuthorizedButton();
const ViewButton = createAuthorizedButton();
const DeleteButton = createAuthorizedButton();
const EditButton = createAuthorizedButton();
const ApproveButton = createAuthorizedButton();
const RejectButton = createAuthorizedButton();

export {
  CreateButton,
  ViewButton,
  DeleteButton,
  EditButton,
  ApproveButton,
  RejectButton,
};
