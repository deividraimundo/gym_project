package utils

func ToAnyArray[T any](in []T) []any {
	res := make([]any, len(in))
	for i, e := range in {
		res[i] = e
	}
	return res
}

func Ptr[T any](value T) *T {
	return &value
}
