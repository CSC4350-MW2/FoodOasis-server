import { Container } from 'typedi';
import { useContainer as routingUseContainer } from 'routing-controllers'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

export const iocLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    routingUseContainer(Container);
};