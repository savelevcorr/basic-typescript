/**
 * AutoBind decorator
 * @param _
 * @param _2
 * @param descriptor {PropertyDescriptor}
 */
export function AutoBind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };

    return adjDescriptor;
}
