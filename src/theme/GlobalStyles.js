import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.colors.html}
  }
  body{
        background-color: ${({ theme }) => theme.colors.body}
    }
    .clockInputEvent {
      & > div {
       border-bottom: ${({ theme }) =>
         theme.colors.clockInputEvent.borderBottom}; 
       &:hover {
      border-bottom: ${({ theme }) =>
        theme.colors.clockInputEvent.inputFocused}; 
       }
     }
    }
    /* .clockInputEvent:hover {
      border-bottom: ${({ theme }) =>
        theme.colors.clockInputEvent.borderBottom}; 
    } */
    .floatingButton {
      background: ${({ theme }) => theme.colors.floatingButton.background};
      box-shadow: ${({ theme }) => theme.colors.floatingButton.boxShadow};

    }
    .homeMap {
      background : ${({ theme }) => theme.colors.homeMap.background}
    }
    .floatingButtonDelete {
      background : ${({ theme }) =>
        theme.colors.floatingButtonDelete.background}
    }
    .homeSlideList {
        background-color: ${({ theme }) => theme.colors.homeSlideList}
    }
    .customToolbar {
      height: 42px;
      border-bottom: ${({ theme }) => theme.colors.toolbar.borderBottom};
      box-shadow: ${({ theme }) => theme.colors.toolbar.boxShadow};
    }
    .toolbarBackground {
      background-color: ${({ theme }) => theme.colors.backgroundToolbar};
    }
    & div {
        &::-webkit-scrollbar {
    height: 9px;
  }
  &::-webkit-scrollbar::hover {
    height: 9px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.scroll.background}
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scroll.color}
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.scroll.hover}
  }
    }
  .globalLoading {
    background: ${({ theme }) => theme.colors.loading.background};
  }
  .profileButton {
    background: ${({ theme }) => theme.colors.profileButton} !important;
  }
  .transparent {
    background: ${({ theme }) => theme.colors.transparent.background};
  }
  .acceptBtn {
    background: ${({ theme }) => theme.colors.acceptBtn.background};
     color: ${({ theme }) => theme.colors.acceptBtn.color};
    box-shadow: -1px -1px 20px 0px #afaca0
  }
  .acceptBtnMuted {
    background: ${({ theme }) =>
      theme.colors.acceptBtn.muted.background} !important;
     color: ${({ theme }) => theme.colors.acceptBtn.muted.color} !important;
  }
  .acceptBtnLoading {
    background: ${({ theme }) =>
      theme.colors.acceptBtn.loadingMode.background} !important;
     color: ${({ theme }) =>
       theme.colors.acceptBtn.loadingMode.color} !important;
  }
  .inputFocused {
    border: ${({ theme }) => theme.colors.inputBorder} !important;
    &:focus {
      border:${({ theme }) => theme.colors.inputFocused} !important;
    }
  }
  .selectFocused {
    border-bottom: ${({ theme }) => theme.colors.selectBorder} !important;
    &:focus {
      border-bottom:${({ theme }) => theme.colors.selectFocused} !important;
    }
  }
  .adsCardBackground {
    background-color: ${({ theme }) => theme.colors.adsCardBackground}
  }
  .FearsCardBackground {
    background-color: ${({ theme }) => theme.colors.FearsCardBackground}
  }
  .postCardBackgroundInfinity {
    background-color: ${({ theme }) => theme.colors.postCardBackgroundInfinity}
  }
  .adsCardBackgroundInfinity {
    background-color: ${({ theme }) => theme.colors.adsCardBackgroundInfinity}
  }

  .productCardBackground {
    background-color: ${({ theme }) => theme.colors.productCardBackground}
  }
  .postCardBackground {
    background-color: ${({ theme }) => theme.colors.postCardBackground}
  }
  .activeLink {
    background: ${({ theme }) => theme.colors.activeLink.background};
    color: ${({ theme }) => theme.colors.activeLink.color}
  }
  .swipeupLine {
    background: ${({ theme }) => theme.colors.swipeupLine.background}
  }
  .walletHeader {
    background: ${({ theme }) => theme.colors.walletHeader.background};
    border: ${({ theme }) => theme.colors.walletHeader.border};
  }
  .addCommentBtn {
    background: ${({ theme }) => theme.colors.addCommentBtn.background}
  }
  .commentTitleDot {
    & > div {
      &:before {
      background: ${({ theme }) => theme.colors.commentTitleDot.background}
    }
    }
  }
  .commentItem {
    background: ${({ theme }) => theme.colors.commentItem.background}
  }
  .rateItemRange {
    background: ${({ theme }) => theme.colors.rateItemRange.background}
  }
  .rateItemRangeContainer {
    background: ${({ theme }) => theme.colors.rateItemRangeContainer.background}
  }
  .rateContainer {
    background: ${({ theme }) => theme.colors.rateContainer.background}
  }
  .primary {
    background: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.primary.color}
  }
  .productOrderItem {
    background: ${({ theme }) => theme.colors.productOrderItem.background}
  }
  .homeAccountToolbarBackground {
    background: ${({ theme }) =>
      theme.colors.homeAccountToolbarBackground.background}
  }
  .bodyGray {
    background: ${({ theme }) => theme.colors.bodyGray.background}
  }
  .walletListIconBackground {
    background: ${({ theme }) =>
      theme.colors.walletListIconBackground.background}
  }
  .walletItem {
    background: ${({ theme }) => theme.colors.walletItem.background}
  }
  .walletModalHeader {
    background: ${({ theme }) => theme.colors.walletModalHeader.background}
  }
  .dotLoaderColor {
    background: ${({ theme }) => theme.colors.dotLoaderColor.background}
  }
  .backdrop {
    background: ${({ theme }) => theme.colors.backdrop.background}
  }
  .alertMsg {
    background: ${({ theme }) => theme.colors.alertMsg.background}
  }
  .menuTemp {
    background: ${({ theme }) => theme.colors.menuTemp.background}
  }
  .menuTempItem {
    background: ${({ theme }) => theme.colors.menuTempItem.background}
  }
  .dotPulse {
    background: ${({ theme }) => theme.colors.dotPulse.background}
  }
  .dotPulseWrapper {
    background: ${({ theme }) => theme.colors.dotPulseWrapper.background}
  }
  .generalAlertGreen {
    background: ${({ theme }) => theme.colors.generalAlertGreen.background}
  }
  .generalAlertRed {
    background: ${({ theme }) => theme.colors.generalAlertRed.background}
  }
  .errorIcon {
    background: ${({ theme }) => theme.colors.errorIcon.background}
  }
  .personIconContainer {
    background: ${({ theme }) => theme.colors.personIconContainer.background}
  }
  .submitBasketContainer {
    background: ${({ theme }) => theme.colors.submitBasketContainer.background}
  }
  .videoIconActived {
    background: ${({ theme }) =>
      theme.colors.videoIcon.activedBackground.background}
  }
  .videoIcon {
    background: ${({ theme }) => theme.colors.videoIcon.background.background}
  }
  .storeOrderListItem {
    background: ${({ theme }) => theme.colors.storeOrderListItem.background};
    border: ${({ theme }) => theme.colors.storeOrderListItem.border};
  }
  .addProductFormFeatureBackground {
    background: ${({ theme }) =>
      theme.colors.addProductForm.features.background}

  }
  .selectItem {
    &:hover {
     background: ${({ theme }) => theme.colors.selectItem.background}
    }
}
`;
