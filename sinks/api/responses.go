/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

package api

import (
	"github.com/ns1labs/orb/pkg/types"
	"net/http"
	"time"
)

type sinkRes struct {
	ID          string         `json:"id"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Tags        types.Tags     `json:"tags"`
	Backend     string         `json:"backend"`
	Config      types.Metadata `json:"config,omitempty"`
	TsCreated   time.Time      `json:"ts_created"`
	created     bool
}

func (s sinkRes) Code() int {
	if s.created {
		return http.StatusCreated
	}

	return http.StatusOK
}

func (s sinkRes) Headers() map[string]string {
	return map[string]string{}
}

func (s sinkRes) Empty() bool {
	return false
}

type sinksPagesRes struct {
	pageRes
	Sinks []sinkRes `json:"sinks"`
}

func (res sinksPagesRes) Code() int {
	return http.StatusOK
}

func (res sinksPagesRes) Headers() map[string]string {
	return map[string]string{}
}

func (res sinksPagesRes) Empty() bool {
	return false
}

type pageRes struct {
	Total  uint64 `json:"total"`
	Offset uint64 `json:"offset"`
	Limit  uint64 `json:"limit"`
	Order  string `json:"order"`
	Dir    string `json:"direction"`
}

type sinksBackendsRes struct {
	Backends []interface{} `json:"backends"`
}

func (s sinksBackendsRes) Code() int {
	return http.StatusOK
}

func (s sinksBackendsRes) Headers() map[string]string {
	return map[string]string{}
}

func (s sinksBackendsRes) Empty() bool {
	return false
}

type sinksBackendRes struct {
	Backend     string         `json:"backend"`
	Description string         `json:"description"`
	Config      types.Metadata `json:"config"`
}

func (s sinksBackendRes) Code() int {
	return http.StatusOK
}

func (s sinksBackendRes) Headers() map[string]string {
	return map[string]string{}
}

func (s sinksBackendRes) Empty() bool {
	return false
}

type errorRes struct {
	Err string `json:"error"`
}

type removeRes struct{}

func (res removeRes) Code() int {
	return http.StatusNoContent
}

func (res removeRes) Headers() map[string]string {
	return map[string]string{}
}

func (res removeRes) Empty() bool {
	return true
}
