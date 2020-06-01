import React, { useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, CardHeader, CardActions, CardActionArea } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import useStyles from './ProductCardStyles';
import { UserContext } from '../../Contexts/UserContext';

const ProductCard = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const { product, path } = props;
    const { addToCart } = useContext(UserContext)
    const handleClick = () => {
        return history.push(path)
    }
    const handleAddToCart = () => {    
        addToCart(product)
    }
    return (
        <Grid item>
            <Card>
                <CardActionArea onClick={handleClick}>
                    <CardHeader title={product.name} titleTypographyProps={{ variant: 'h6' }} classes={props.case === 'cart' ? {title: classes.titleCart  } : { title: classes.title  }} />
                    <Typography>
                        {product.name}
                    </Typography>
                    <Typography>{product.description}</Typography>
                    <Typography>
                        {product.price}SEK
                    </Typography>
                </CardActionArea>
                <CardActions>
                    {props.case === "main" ? 
                        <><Button size="small" onClick={handleClick}>View product</Button>
                        <Button size="small" onClick={handleAddToCart}>Add to cart</Button></> : null}
                    {props.case === 'cart' ? <Typography>test</Typography> : null}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard;