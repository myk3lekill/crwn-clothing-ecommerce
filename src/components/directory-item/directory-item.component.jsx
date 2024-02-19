import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { id, imageUrl, title } = category;
    return(
        <DirectoryItemContainer>
            <BackgroundImage imageUrl={imageUrl} />
                <Body>
                    <h2>{title}</h2>
                    <p>Shop Now</p>
                </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem