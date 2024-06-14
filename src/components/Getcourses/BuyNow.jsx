import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { REMOVE_ITEM_FROM_WISHLIST } from '../../Redux/AddToWishlist/Wishlist-Constants';
import { manipulateWishList } from '../../Redux/AddToWishlist/Wishlist-Action';
import { courseStageAPI } from '../../api/requests/courses/courseStageAPI';
import { manipulateCart } from '../../Redux/AddToCart/Cart-Action';
import { ADD_ITEM } from '../../Redux/AddToCart/Cart-Constants';

export default function BuyNow() {
  let { id } = useParams();
  const cartItems = useSelector((state) => state.CartReducer.cartItems);
  const [buy, setBuy] = useState(false);
  const [addToCartText, setAddToCartText] = useState('Add to Cart');

  const [userdata, setUserdata] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const updateState = (data) => {
    cartBtnText(data.data.courseStage);
    setUserdata(data.data.courseData);
  };
  const cartBtnText = (stage) => {
    if (stage === 'CART') {
      setAddToCartText('Go to Cart');
    } else if (stage === 'BOUGHT') {
      setBuy(true);
    }
  };
  const buycourse = async (userdata) => {
    if (cartItems?.filter((item) => item.id === id).length) {
      navigate('/check-out');
    } else {
      addCourseTocart(userdata);
      navigate('/check-out');
    }
  };
  const addCourseTocart = async (userdata) => {
    await courseStageAPI
      .addCourseToWishListOrCart(id, 'CART')
      .then((res) => {
        getCourseFromCart();
      })
      .catch((err) => {});
  };
  const getCourseFromCart = async () => {
    await courseStageAPI
      .getCourses('CART')

      .then((data) => {
        data.map((item) => {
          if (cartItems?.filter((cartItems) => cartItems.id === item.id).length) {
          } else {
            dispatch(manipulateCart(ADD_ITEM, item));
          }
        });
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        sx={{
          fontSize: { xs: '11px', sm: '12px', mds: '13px' },
          textTransform: { xs: 'capitalize', sm: 'uppercase' },
        }}
        onClick={() => {
          buycourse(userdata);
        }}
      >
        Buy Now
      </Button>
    </div>
  );
}
