import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostModal from './PostModal';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getArticlesAPI } from '../actions';

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");
    
    useEffect(() => {
        props.getArticles()
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget) {
            return;
        }

        switch(showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    }

    return (
        <>
            <Container>
                <ShareBox>
                    <div>
                        { props.user && props.user.photoURL ?
                            (<img src={ props.user.photoURL} />)
                            :
                            (<img src="/images/user.svg" alt="" />)                          
                        }
                        <button 
                            onClick = {handleClick}
                            disabled = { props.loading ? true : false }
                            className="post-space">
                            Start a Post    
                        </button> 
                    </div>

                    <div>
                        <button>
                            <img src="/images/photo-icon.png" className="post-icon" alt="" />
                            <span>create blog about your work, including payament methods, you can add images and videos </span>
                        </button>
                    </div>
                </ShareBox>

                <Content>
                    {
                        props.loading && <img src="./images/spin-loading.gif" />
                    }
                    {
                        props.articles.length != 0 &&
                        props.articles.map((article, key) => (
                
                            <Article key = {key} >
                                <SharedActor>
                                    <a>
                                        <img src={article.actor.image} alt="" />
                                        <div>
                                            <span>{article.actor.title}</span>
                                            <span>{article.actor.description}</span>
                                            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </a>

                                    <button>
                                        <img src="images/ellipsis.png" alt="" />
                                    </button>
                                </SharedActor>

                                <Description>{article.description}</Description>

                                <SharedImage>
                                    <a>
                                        {
                                            !article.sharedImg && article.video ? 
                                                (<ReactPlayer width = {'100%'} url={article.video} />)
                                            :
                                            (
                                                article.sharedImg && <img src={article.sharedImg} />
                                            )
                                        }
                                    </a>
                                </SharedImage>



                        
                            </Article>        
                        ))        
            }
                </Content>

                <PostModal showModal={showModal} handleClick = {handleClick} />
            </Container>
        </>
    );
};

const Container = styled.div`
    grid-area: main;
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    margin:10px;
    border-radius: 5px;
    position: relative;
    border: none;
    border-radius: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px 0;
    background: #fff;

    div {
        button {
            outline: none;
            color: rgba(0,0,0,0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;

            &:hover {
                background-color: rgba(0,0,0,0.07);
                border-radius: 6px;
            }
        }

        .post-space {
            border-color:rgba(159,156,156,0.75);
            border-style: solid;
        }

        .post-icon {
            width: 27px;
        }

        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px;

            img {
                width: 48px;
                margin-right: 8px;
                border-radius: 50%;
            }

            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0,15);
                border-radius: 35px;
                background-color: #fff;
                text-align: left;
            }
        }

        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button {
                img {
                    margin: 0 4px 0 -2px;
                }

                span {
                    color: #70b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
    
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;

    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span {
                text-align: left;

                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }

                &:nth-child(n+1) {
                    font-size: 12px;
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }

    button {
        position: absolute;
        right: 12px;
        outline: none;
        border: none;
        top: 0;
        background: transparent;
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;
`;

const SharedImage = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    padding-bottom: 10px;

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const SocialCounts = styled.ul`
    line-height: 100%;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    list-style: none;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;

    li {
        margin-right: 5px;
        font-size: 12px;

        button {
            display: flex;
            border: none;
            background: #fff;
        }
    }

    img {
        width: 18px;
    }
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;

    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        background-color: #fff;

        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
`;

const Content = styled.div`
    text-align: center;
    & > img {
        width: 30px;
    }
`;

const mapStateToProps = (state) => {
    return {
        loading: state.articleState.loading,
        user: state.userState.user,
        articles: state.articleState.articles,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI()),
})

export default connect(mapStateToProps, mapDispatchToProps) (Main);