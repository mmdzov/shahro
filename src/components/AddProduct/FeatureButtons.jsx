import { FeatureButtonsContainer, Icon } from "./AddProductForm.styled";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const FeatureButtons = ({
  onDelete,
  canDelete,
  onAppend,
  isLastItem,
  length,
}) => {
  return (
    <FeatureButtonsContainer>
      {canDelete ? (
        <Icon onClick={onDelete} background="#e84e46">
          <CloseIcon />
        </Icon>
      ) : null}
      {isLastItem ? (
        <Icon onClick={onAppend} background="#0886e0">
          <AddIcon />
        </Icon>
      ) : null}
    </FeatureButtonsContainer>
  );
};

export default FeatureButtons;
