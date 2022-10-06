import React, { useCallback, useState } from "react";
import { Wrapper, StyledButton } from "./Main.styles";
import { useFetchAllProducts } from "../../hooks/fetchProducts";
import { Badge, Drawer, Grid, LinearProgress } from "@mui/material";
import { Product } from "../../models/models";
import Item from "../Iitem/Item";
import { AddShoppingCart } from "@mui/icons-material";
import Cart from "../Cart/Cart";

const Main = () => {
  const { data, isLoading, error } = useFetchAllProducts();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const getTotalItems = useCallback((items: Product[]) => {
    return items.reduce((acc, item) => acc + item.amount!, 0);
  }, []);
  const handleAddToCart = useCallback((clicked: Product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clicked.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clicked.id ? { ...item, amount: item.amount! + 1 } : item
        );
      }

      return [...prev, { ...clicked, amount: 1 }];
    });
  }, []);
  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount! - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as Product[])
    );
  }, []);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>"Something vent wrong !"</div>;


  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          addToCart={handleAddToCart}
          cartItems={cartItems}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default Main;
