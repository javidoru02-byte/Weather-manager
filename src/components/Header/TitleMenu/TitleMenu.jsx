import { NavLink } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f7f6f8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  fontSize: "17px",
  fontWeight: "600",
  textDecoration: "none",
  color: theme.vars
    ? theme.vars.palette.text.primary
    : theme.palette.text.primary,
  transition: "0.2s",

  "&:hover": {
    backgroundColor: "#e3f2fd",
    transform: "scale(1.02)",
    cursor: "pointer",
  },

  "&.active": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },

  ...theme.applyStyles?.("dark", {
    backgroundColor: "#000000",
  }),
}));

function TitleMenu() {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
        <Item component={NavLink} to="/" sx={{ flex: 1 }}>
          Головна
        </Item>
        <Item component={NavLink} to="/favourites" sx={{ flex: 1 }}>
          Обране
        </Item>
      </Stack>
    </Box>
  );
}
// поки що ніде не використовується, у Header.jsx є фукнціонал, поки залишу, вдруг будемо шось змінювати (Kiril) 
export default TitleMenu;