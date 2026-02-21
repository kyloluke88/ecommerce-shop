"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { categoryTabs, currencyOptions, languageOptions, locationOptions } from "@/features/store/data/header-data";

type StoreUiState = {
  mobileMenuOpen: boolean;
  allCategoriesOpen: boolean;
  locationMenuOpen: boolean;
  languageMenuOpen: boolean;
  currencyMenuOpen: boolean;
  accountMenuOpen: boolean;
  activeCategoryTab: string;
  selectedLocation: string;
  selectedLanguage: string;
  selectedCurrency: string;
  searchQuery: string;
  mobileSectionOpen: Record<string, boolean>;
};

type StoreUiAction =
  | { type: "TOGGLE_MOBILE_MENU" }
  | { type: "CLOSE_MOBILE_MENU" }
  | { type: "TOGGLE_ALL_CATEGORIES" }
  | { type: "TOGGLE_LOCATION_MENU" }
  | { type: "TOGGLE_LANGUAGE_MENU" }
  | { type: "TOGGLE_CURRENCY_MENU" }
  | { type: "TOGGLE_ACCOUNT_MENU" }
  | { type: "SET_ACTIVE_CATEGORY_TAB"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "SET_CURRENCY"; payload: string }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "TOGGLE_MOBILE_SECTION"; payload: string }
  | { type: "CLOSE_POPOVERS" };

const initialState: StoreUiState = {
  mobileMenuOpen: false,
  allCategoriesOpen: false,
  locationMenuOpen: false,
  languageMenuOpen: false,
  currencyMenuOpen: false,
  accountMenuOpen: false,
  activeCategoryTab: categoryTabs[0]?.id ?? "dairy-bakery",
  selectedLocation: locationOptions[0],
  selectedLanguage: languageOptions[0],
  selectedCurrency: currencyOptions[0],
  searchQuery: "",
  mobileSectionOpen: {
    "mobile-home": true,
  },
};

function storeUiReducer(state: StoreUiState, action: StoreUiAction): StoreUiState {
  switch (action.type) {
    case "TOGGLE_MOBILE_MENU":
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case "CLOSE_MOBILE_MENU":
      return { ...state, mobileMenuOpen: false };
    case "TOGGLE_ALL_CATEGORIES":
      return {
        ...state,
        allCategoriesOpen: !state.allCategoriesOpen,
        locationMenuOpen: false,
      };
    case "TOGGLE_LOCATION_MENU":
      return {
        ...state,
        locationMenuOpen: !state.locationMenuOpen,
        allCategoriesOpen: false,
      };
    case "TOGGLE_LANGUAGE_MENU":
      return {
        ...state,
        languageMenuOpen: !state.languageMenuOpen,
        currencyMenuOpen: false,
      };
    case "TOGGLE_CURRENCY_MENU":
      return {
        ...state,
        currencyMenuOpen: !state.currencyMenuOpen,
        languageMenuOpen: false,
      };
    case "TOGGLE_ACCOUNT_MENU":
      return { ...state, accountMenuOpen: !state.accountMenuOpen };
    case "SET_ACTIVE_CATEGORY_TAB":
      return { ...state, activeCategoryTab: action.payload };
    case "SET_LOCATION":
      return { ...state, selectedLocation: action.payload, locationMenuOpen: false };
    case "SET_LANGUAGE":
      return { ...state, selectedLanguage: action.payload, languageMenuOpen: false };
    case "SET_CURRENCY":
      return { ...state, selectedCurrency: action.payload, currencyMenuOpen: false };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "TOGGLE_MOBILE_SECTION":
      return {
        ...state,
        mobileSectionOpen: {
          ...state.mobileSectionOpen,
          [action.payload]: !state.mobileSectionOpen[action.payload],
        },
      };
    case "CLOSE_POPOVERS":
      return {
        ...state,
        allCategoriesOpen: false,
        locationMenuOpen: false,
        languageMenuOpen: false,
        currencyMenuOpen: false,
        accountMenuOpen: false,
      };
    default:
      return state;
  }
}

type StoreUiContextValue = {
  state: StoreUiState;
  dispatch: Dispatch<StoreUiAction>;
};

const StoreUiContext = createContext<StoreUiContextValue | null>(null);

export function StoreUiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(storeUiReducer, initialState);

  useEffect(() => {
    document.body.style.overflow = state.mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.mobileMenuOpen]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StoreUiContext.Provider value={value}>{children}</StoreUiContext.Provider>;
}

export function useStoreUi() {
  const context = useContext(StoreUiContext);

  if (!context) {
    throw new Error("useStoreUi must be used inside StoreUiProvider");
  }

  return context;
}
